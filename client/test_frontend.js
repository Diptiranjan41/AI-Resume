// frontend/test_frontend.js
// This is a simple test to check if frontend can connect to backend

const API_BASE_URL = 'http://localhost:5000/api';

async function testBackendConnection() {
    console.log('🧪 Testing Frontend-Backend Connection...');
    
    try {
        // Test health endpoint
        const healthResponse = await fetch(`${API_BASE_URL}/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health Check:', healthData);
        
        // Test interview start
        const interviewResponse = await fetch(`${API_BASE_URL}/interview/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                domain: 'software_engineer',
                questions_count: 2
            })
        });
        const interviewData = await interviewResponse.json();
        console.log('✅ Interview Start:', interviewData);
        
    } catch (error) {
        console.error('❌ Connection Test Failed:', error);
    }
}

// Run the test
testBackendConnection();