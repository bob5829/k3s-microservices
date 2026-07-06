from flask import Flask, jsonify
import datetime
import os

app = Flask(__name__)

@app.route('/time')
def time():
    key = os.environ.get('API_KEY', 'not-set')
    return jsonify({
        'time': datetime.datetime.now().isoformat(),
        'key_preview': '...' + key[-4:] if key != 'not-set' else key
    })

@app.route('/')
@app.route('/<path:path>')
def hello(path='/'):
    return jsonify({
        'message': 'Hello from Python!',
        'time': datetime.datetime.now().isoformat(),
        'route': path
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)