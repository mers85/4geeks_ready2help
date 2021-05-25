from wtforms import Form, BooleanField, StringField, PasswordField, TextField, FloatField, IntegerField, validators
#from werkzeug.datastructures import ImmutableMultiDict
import wtforms_json
wtforms_json.init()

class ProjectForm(Form):
    title = StringField('Title', [validators.DataRequired()])
    subtitle = StringField('Subtitle', [validators.Length(max=600)])
    description = TextField('Description')
    money_needed = FloatField('Money needed')
    people_needed = IntegerField('People needed')
    status = StringField('Status')
    categories = JSONFieldList(StringField('Categories'))

