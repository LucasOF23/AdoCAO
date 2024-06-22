from faker import Faker
from random import choice, randint, randrange, random
import uuid 
from datetime import date

fake = Faker('pt_BR')
CNT_USERS = 50
CNT_ANIMALS = 50
CNT_ONGS = 5
CNT_CITIES = 40
ANIMAL_SPECIES = ['Gato', 'Cachorro', 'Papagaio', 'Peixe', 'Macaco']
ANIMAL_TAGS = ['Gordo', 'Magro', 'Caseiro', 'Viajante', 'Matemático', 'Físico', 'Engenheiro (hur)', 'Pilantra', 'Agiota']
PWD_HASH = '$2a$10$MtXP8e2TXPblpVEXUKURzOFgzCvjMY0qZ5qxH8UeZSk0DeNbRVFzK'
TAG_PER_ANIMAL = (0, 5)
NORMAL_WORKER_PER_ONG = (1, 5)
MANAGER_PER_ONG = (1, 3)

params = {
    'Users': '(id, name, email, "passwordHash", "ContactInfoId", "isSuperAdmin")',
    'ContactInfos': '(id, email, "instagramProfile", "facebookProfile", "telephoneNumber", other)',
    'Animals': '(id, name, description, "imagePath", birthdate, "heightInCm", "weightInKg", "isNeutered", "isDewormed", "animalGender", "AnimalSpecieId", "ONGId", "UserId", "CityId")',
    'ONGs': '(id, name, cnpj, address)',
    'Cities': '(id, name, state)',
    'AnimalSpecies': '(id, name)',
    'AnimalTags': '(id, name)',
    'AnimalHasTags': '("AnimalId", "AnimalTagId")',
    'UserWorksAtONGs': '("UserId", "ONGId", "isManager")'
}

def format_values(attrs):
    def parse(value):
        if value is None:
            return 'NULL'
        if isinstance(value, int):
            return str(value)
        if isinstance(value, float):
            return '{:.2f}'.format(value)
        if isinstance(value, bool):
            return 'TRUE' if value else 'FALSE'
        return "'" + str(value).replace("'", "''") + "'"
    
    return '(' + ", ".join(map(parse, attrs)) + ')'


def insert_many(name, values):
    ret = f'TRUNCATE public."{name}" CASCADE;\n'
    ret += f'INSERT INTO public."{name}" {params[name]} VALUES ' + ', '.join(format_values(v) for v in values) + ';\n'
    return ret


def numero_cel():
    return ''.join(filter(lambda x: x in '0123456789', fake.cellphone_number()[3:]))[:11]

def opt(value):
    return choice([None, value])

def rbool():
    return choice([True, False])

def cnpj():
    return ''.join(c for c in fake.cnpj() if c.isdigit())

def fake_animal(id):
    tp = [id, fake.name(), fake.text(), fake.uuid4(), fake.date(), opt(random() * 80), opt(random() * 40), rbool(), rbool(), choice(['M', 'F', 'N']), randint(1, len(ANIMAL_SPECIES)), None, None, randint(1, CNT_CITIES)]
    if randint(0, 2):  # De ONG - 66%
        tp[-3] = randint(1, CNT_ONGS)
    else:
        tp[-2] = randint(1, CNT_USERS)
    return tp


cities = [(i, fake.city(), fake.state_abbr()) for i in range(1, CNT_CITIES+1)]

contact_info = [(i, fake.email(), opt('@' + fake.name()), opt(fake.name()), opt(numero_cel()), opt(fake.text)) for i in range(1, CNT_USERS+1)]

users = [(i, fake.name(), fake.email(), PWD_HASH, i, rbool()) for i in range(1, CNT_USERS+1)]

crt_species = [(i+1, specie) for i, specie in enumerate(ANIMAL_SPECIES)]
crt_tags = [(i+1, tag) for i, tag in enumerate(ANIMAL_TAGS)]

ongs = [(i, 'ONG de ' + fake.name(), cnpj(), fake.address()) for i in range(1, CNT_ONGS + 1)]

animals = [fake_animal(i) for i in range(1, CNT_ANIMALS + 1)]

animal_has_tag = []
for animal in animals:
    rem_tags = list(range(1, len(ANIMAL_TAGS) + 1))
    for _ in range(randint(*TAG_PER_ANIMAL)):
        tg = choice(rem_tags)
        rem_tags.remove(tg)
        animal_has_tag.append((animal[0], tg))

user_work_ong = []
for ong in ongs:
    rem_users = list(range(1, CNT_USERS + 1))
    for _ in range(randint(*NORMAL_WORKER_PER_ONG)):
        us = choice(rem_users)
        rem_users.remove(us)
        user_work_ong.append((us, ong[0], False))
    for _ in range(randint(*MANAGER_PER_ONG)):
        us = choice(rem_users)
        rem_users.remove(us)
        user_work_ong.append((us, ong[0], True))

resp = ''
resp += insert_many('Cities', cities)
resp += insert_many('ContactInfos', contact_info)
resp += insert_many('Users', users)
resp += insert_many('AnimalSpecies', crt_species)
resp += insert_many('AnimalTags', crt_tags)
resp += insert_many('ONGs', ongs)
resp += insert_many('Animals', animals)
resp += insert_many('AnimalHasTags', animal_has_tag)
resp += insert_many('UserWorksAtONGs', user_work_ong)

print(resp)
