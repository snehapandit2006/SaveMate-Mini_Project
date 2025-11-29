# AI Insights & Summarization API

T5-small powered text summarization API with AI insights - **Integration Ready**

## Features

- 🤖 **T5-small Model** - Fast and accurate text summarization
- 📊 **AI Insights** - Word count, compression ratio, and key metrics
- 🗄️ **MongoDB Integration** - Async database operations with Motor
- 🚀 **Production Ready** - CORS enabled, health checks, error handling
- 📝 **RESTful API** - Clean endpoints for easy backend integration

## API Endpoints

### Health Check
```
GET /api/v1/health
```
Returns service status and model information.

### Generate Summary
```
POST /api/v1/summarize
Content-Type: application/json

{
  "text": "Your long text here...",
  "max_length": 120,
  "min_length": 30
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "summary": "Generated summary text...",
  "insights": {
    "summary": "Generated summary text...",
    "word_count": 250,
    "summary_word_count": 45,
    "compression_ratio": 82.0,
    "model": "t5-small"
  }
}
```

### Get All Summaries
```
GET /api/v1/summaries?limit=50
```

### Get Specific Summary
```
GET /api/v1/summaries/{summary_id}
```

## Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure Environment
Copy `.env.example` to `.env` and configure:
```bash
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=ai_insights_db
```

### 3. Run MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB locally
```

### 4. Start API Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API will be available at: `http://localhost:8000`

Interactive docs: `http://localhost:8000/docs`

## Integration Notes for Backend Team

### CORS Configuration
CORS is currently set to allow all origins (`*`). Update in `main.py`:
```python
allow_origins=["https://your-frontend-domain.com"]
```

### MongoDB Connection
Configure MongoDB URL in `.env` file or environment variables:
- `MONGODB_URL` - MongoDB connection string
- `DATABASE_NAME` - Database name

### Error Handling
All endpoints return proper HTTP status codes:
- `200` - Success
- `404` - Resource not found
- `500` - Server error
- `503` - Service unavailable

### Response Format
All responses follow consistent JSON structure with proper typing via Pydantic models.

## Tech Stack

- **FastAPI** - Modern async web framework
- **T5-small** - Hugging Face transformer model
- **MongoDB** - NoSQL database with Motor async driver
- **Pydantic** - Data validation and settings management

## Model Information

- **Model**: T5-small (Google's Text-to-Text Transfer Transformer)
- **Task**: Summarization
- **Framework**: PyTorch
- **First run**: Model will be downloaded automatically (~250MB)

## Development

```bash
# Install dev dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn main:app --reload

# Check API docs
open http://localhost:8000/docs
```

---

**Ready for backend integration** ✓
