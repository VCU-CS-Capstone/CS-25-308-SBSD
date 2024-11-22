from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from query_data import query_rag
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def hello():
    return "Hello, World!"

@app.route('/queryChatBot', methods=['POST'])
@cross_origin()
def queryChatBot():
    data = request.get_json()

    if data is None:
        return jsonify({'error': 'No JSON received'}), 400

    message = data.get('message')
    app.logger.info(f"Received message: {message}")
    
    responseMessage = query_rag(message)
    app.logger.info(f"Bot message: {responseMessage}")
    
    return jsonify({'message': responseMessage}), 200

if __name__ == '__main__':
    app.run(debug=True)
