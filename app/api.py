from typing import List
from fastapi import APIRouter, HTTPException

from .model import get_summarizer, generate_ai_insights
from .db import insert_summary, fetch_summaries, get_summary_by_id
from .schemas import SummarizeRequest, SummaryResponse, SummaryRecord, AIInsights


router = APIRouter(prefix="/api/v1", tags=["AI Insights"])


@router.get("/health")
async def health() -> dict:
    """Health check endpoint - verifies model is loaded"""
    try:
        get_summarizer()
        return {"status": "ok", "model": "t5-small", "service": "AI Insights API"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Service unavailable: {str(e)}")


@router.post("/summarize", response_model=SummaryResponse)
async def summarize(payload: SummarizeRequest) -> SummaryResponse:
    """Generate AI-powered summary and insights from text"""
    try:
        insights = generate_ai_insights(
            text=payload.text,
        )
        
        new_id = await insert_summary(
            source_text=payload.text,
            summary_text=insights["summary"],
            insights=insights
        )
        
        return SummaryResponse(
            id=new_id,
            summary=insights["summary"],
            insights=AIInsights(**insights)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Summarization failed: {str(e)}")


@router.get("/summaries", response_model=List[SummaryRecord])
async def get_summaries(limit: int = 50) -> List[SummaryRecord]:
    """Retrieve all summaries with AI insights"""
    try:
        summaries = await fetch_summaries(limit=limit)
        return [SummaryRecord(**summary) for summary in summaries]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch summaries: {str(e)}")


@router.get("/summaries/{summary_id}", response_model=SummaryRecord)
async def get_summary(summary_id: str) -> SummaryRecord:
    """Retrieve a specific summary by ID"""
    summary = await get_summary_by_id(summary_id)
    if not summary:
        raise HTTPException(status_code=404, detail="Summary not found")
    return SummaryRecord(**summary)


