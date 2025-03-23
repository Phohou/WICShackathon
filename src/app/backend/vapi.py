from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/convo', methods=['POST'])
def get_conversation(): 
    data = request.get_json()

    # Extract input data
    city = data.get('city')
    state = data.get('state')
    income = data.get('income')
    rent_buy = data.get('rent_buy')
    bed = data.get('bed')
    bath = data.get('bath')
    stories = data.get('stories')

    # Return the response along with the input data
    return jsonify({
        "city": city,
        "state": state,
        "income": income,
        "rent_buy": rent_buy,
        "bed": bed,
        "bath": bath,
        "stories": stories,
    })

if __name__ == '__main__':
    app.run(debug=True)