import os
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from dotenv import load_dotenv

load_dotenv()

# Configuration
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ai_insights_db")
TEST_MODE = os.getenv("TEST_MODE", "false").lower() == "true"

_client: Optional[AsyncIOMotorClient] = None
_database: Optional[AsyncIOMotorDatabase] = None
_test_storage: List[Dict[str, Any]] = []  # In-memory storage for test mode


async def init_db() -> None:
    """Initialize database connection"""
    global _client, _database
    
    if TEST_MODE:
        print("⚠️  Running in TEST MODE - using in-memory storage (no MongoDB required)")
        return
    
    _client = AsyncIOMotorClient(MONGODB_URL)
    _database = _client[DATABASE_NAME]
    
    # Create indexes for better query performance
    await _database.summaries.create_index([("created_at", -1)])
    await _database.summaries.create_index([("source_text", "text")])
    print(f"✓ Connected to MongoDB: {DATABASE_NAME}")


async def close_db() -> None:
    """Close database connection"""
    global _client
    if _client:
        _client.close()
        print("✓ Closed MongoDB connection")


def get_database() -> AsyncIOMotorDatabase:
    """Get database instance"""
    if _database is None:
        raise RuntimeError("Database not initialized. Call init_db() first.")
    return _database


async def insert_summary(source_text: str, summary_text: str, insights: Optional[Dict[str, Any]] = None) -> str:
    """Insert a new summary with optional AI insights"""
    if TEST_MODE:
        # Test mode: store in memory
        doc_id = str(len(_test_storage) + 1)
        document = {
            "id": doc_id,
            "source_text": source_text,
            "summary_text": summary_text,
            "insights": insights or {},
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        _test_storage.append(document)
        return doc_id
    
    # Production mode: store in MongoDB
    db = get_database()
    document = {
        "source_text": source_text,
        "summary_text": summary_text,
        "insights": insights or {},
        "created_at": datetime.now(timezone.utc)
    }
    result = await db.summaries.insert_one(document)
    return str(result.inserted_id)


async def fetch_summaries(limit: int = 50) -> List[Dict[str, Any]]:
    """Fetch recent summaries"""
    if TEST_MODE:
        # Test mode: return from memory
        return list(reversed(_test_storage[-limit:]))
    
    # Production mode: fetch from MongoDB
    db = get_database()
    cursor = db.summaries.find().sort("created_at", -1).limit(limit)
    summaries = []
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        doc["created_at"] = doc["created_at"].isoformat()
        summaries.append(doc)
    return summaries


async def get_summary_by_id(summary_id: str) -> Optional[Dict[str, Any]]:
    """Get a specific summary by ID"""
    if TEST_MODE:
        # Test mode: search in memory
        for doc in _test_storage:
            if doc["id"] == summary_id:
                return doc
        return None
    
    # Production mode: fetch from MongoDB
    from bson import ObjectId
    db = get_database()
    try:
        doc = await db.summaries.find_one({"_id": ObjectId(summary_id)})
        if doc:
            doc["id"] = str(doc.pop("_id"))
            doc["created_at"] = doc["created_at"].isoformat()
        return doc
    except Exception:
        return None


