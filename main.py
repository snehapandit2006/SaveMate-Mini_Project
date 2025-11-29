from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.api import router as api_router
from app.db import init_db, close_db


@asynccontextmanager
async def lifespan(application: FastAPI):
    # Startup: Connect to MongoDB
    await init_db()
    yield
    # Shutdown: Close MongoDB connection
    await close_db()


def create_app() -> FastAPI:
    application = FastAPI(
        title="AI Insights & Summarization API",
        version="1.0.0",
        description="T5-small powered text summarization with AI insights - Integration Ready",
        lifespan=lifespan
    )
    
    
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    application.include_router(api_router)
    return application


app = create_app()


