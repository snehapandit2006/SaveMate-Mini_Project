from typing import Optional, Dict, Any
from transformers import pipeline, Pipeline


_summarizer: Optional[Pipeline] = None


def get_summarizer() -> Pipeline:
    global _summarizer
    if _summarizer is None:
        # T5-small model for summarization
        _summarizer = pipeline(
            task="summarization",
            model="t5-small",
            tokenizer="t5-small",
            framework="pt",
        )
    return _summarizer


def summarize_text(text: str, max_length: int = 120, min_length: int = 30) -> str:
    summarizer = get_summarizer()
    result = summarizer(
        text,
        max_length=max_length,
        min_length=min_length,
        do_sample=False,
        truncation=True,
    )
    return result[0]["summary_text"].strip()


def generate_ai_insights(text: str) -> Dict[str, Any]:
    """Generate AI insights including summary, word count, and key metrics"""
    summary = summarize_text(text)
    
    word_count = len(text.split())
    summary_word_count = len(summary.split())
    compression_ratio = round((1 - summary_word_count / word_count) * 100, 2) if word_count > 0 else 0
    
    return {
        "summary": summary,
        "word_count": word_count,
        "summary_word_count": summary_word_count,
        "compression_ratio": compression_ratio,
        "model": "t5-small"
    }


