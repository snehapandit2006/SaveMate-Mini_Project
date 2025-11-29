from typing import Optional, Dict, Any
from pydantic import BaseModel, Field


class SummarizeRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Text to summarize")
    max_length: Optional[int] = Field(120, gt=10, le=512, description="Maximum summary length")
    min_length: Optional[int] = Field(30, ge=5, lt=512, description="Minimum summary length")


class AIInsights(BaseModel):
    summary: str
    word_count: int
    summary_word_count: int
    compression_ratio: float
    model: str


class SummaryResponse(BaseModel):
    id: str
    summary: str
    insights: AIInsights


class SummaryRecord(BaseModel):
    id: str
    source_text: str
    summary_text: str
    insights: Dict[str, Any]
    created_at: str


