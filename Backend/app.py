from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate 
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:12345678@localhost:5432/contactbook"
db = SQLAlchemy(app)
migrate = Migrate(app, db)
cors = CORS(app)
class ContactModel(db.Model):
    __tablename__ = 'contacts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String())
    telephone = db.Column(db.String(), unique=True)
    gps_location = db.Column(db.String())
    school = db.Column(db.String())

    def __init__(self, name, email, telephone, gps_location, school):
        self.name = name
        self.email=email
        self.telephone=telephone
        self.gps_location=gps_location
        self.school=school

    def __repr__(self):
        return f"<Car {self.name}>"

@app.route('/')
def hello():
    return {"hello": "world"}

@app.route('/addcontact', methods=['POST'])
def add_contact():  
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            existing_contact = ContactModel.query.filter_by(telephone=data['telephone']).first()
            if existing_contact is None:
                new_contact = ContactModel(name=data['name'], email=data['email'], telephone=data['telephone'], gps_location=data['gps_location'], school=data['school'])
                db.session.add(new_contact)
                db.session.commit()
                return jsonify({"message": f"Contact {new_contact.name} has been created successfully."})
            else:
                return jsonify({"message": f"Phone number already existed."}) 
        else:
            return jsonify({"error": "The request payload is not in JSON format"})   

@app.route('/readallcontacts', methods=['GET'])
def get_all_contact():
    if request.method == 'GET':
        contacts = ContactModel.query.all()
        results = [
                {   "id": contact.id,
                    "name": contact.name,
                    "email": contact.email,
                    "telephone": contact.telephone,
                    "gps_location": contact.gps_location,
                    "school": contact.school
                } for contact in contacts]
        return jsonify({"count": len(results), "contacts": results})

@app.route('/contacts/<contact_id>', methods=['GET'])
def get_contact(contact_id):
    if request.method == 'GET':
        contact = ContactModel.query.get_or_404(contact_id)
        response = {"id": contact.id,
                    "name": contact.name,
                    "email": contact.email,
                    "telephone": contact.telephone,
                    "gps_location": contact.gps_location,
                    "school": contact.school
                    }
        return jsonify({"message": "success", "contact": response})

@app.route('/contacts/update/<contact_id>', methods=['PUT'])
def update_contact(contact_id):
    if request.method == 'PUT':
        data = request.get_json()
        contact = ContactModel.query.get_or_404(contact_id)
        contact.name = data['name']
        contact.email = data['email']
        contact.telephoe = data['telephone']
        contact.gps_location = data['gps_location']
        contact.school = data['school']
        db.session.add(contact)
        db.session.commit()
        return jsonify({"message": f"contact {contact.name} successfully updated"})

@app.route('/contacts/delete/<contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    if request.method == 'DELETE':
        contact = ContactModel.query.get_or_404(contact_id)
        db.session.delete(contact)
        db.session.commit()
        return jsonify({"message": f"contact {contact.name} successfully deleted."})

if __name__ == '__main__':
    app.run(debug=True)