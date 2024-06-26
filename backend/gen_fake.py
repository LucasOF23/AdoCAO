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

# senha123
PWD_HASH = '$2a$10$MtXP8e2TXPblpVEXUKURzOFgzCvjMY0qZ5qxH8UeZSk0DeNbRVFzK'
TAG_PER_ANIMAL = (0, 5)
NORMAL_WORKER_PER_ONG = (1, 5)
MANAGER_PER_ONG = (1, 3)

seqs_to_reset = ['Animals_id_seq', 'AnimalSpecies_id_seq', 'AnimalTags_id_seq', 'Cities_id_seq', 'ContactInfos_id_seq', 'ONGs_id_seq', 'Users_id_seq']

params = {
    'Users': '(name, email, "passwordHash", "ContactInfoId", "isSuperAdmin")',
    'ContactInfos': '(email, "instagramProfile", "facebookProfile", "telephoneNumber", other)',
    'Animals': '(name, "isAdopted", description, "imagePath", birthdate, "heightInCm", "weightInKg", "isNeutered", "isDewormed", "animalGender", "AnimalSpecieId", "ONGId", "UserId", "CityId")',
    'ONGs': '(name, cnpj, address, "CityId", "ContactInfoId")',
    'Cities': '(name, state)',
    'AnimalSpecies': '(name)',
    'AnimalTags': '(name)',
    'AnimalHasTags': '("AnimalId", "AnimalTagId")',
    'UserWorksAtONGs': '("UserId", "ONGId", "isManager")'
}

#ong, cityid contactinfo


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

def fake_animal():
    is_adopted = randint(1, 10) <= 2
    tp = [fake.name(), is_adopted, fake.text(), fake.uuid4(), fake.date(), opt(random() * 80), opt(random() * 40), rbool(), rbool(), choice(['M', 'F', 'N']), randint(1, len(ANIMAL_SPECIES)), None, None, randint(1, CNT_CITIES)]
    if randint(0, 2):  # De ONG - 66%
        tp[-3] = randint(1, CNT_ONGS)
    else:
        tp[-2] = randint(1, CNT_USERS)
    return tp


cities = [(fake.city(), fake.state_abbr()) for i in range(1, CNT_CITIES+1)]

contact_info = [(fake.email(), opt('@' + fake.name()), opt(fake.name()), opt(numero_cel()), opt(fake.text())) for i in range(1, CNT_USERS+CNT_ONGS+1)]

users = [(fake.name(), fake.email(), PWD_HASH, i, rbool()) for i in range(1, CNT_USERS+1)]

crt_species = [(specie,) for i, specie in enumerate(ANIMAL_SPECIES)]
crt_tags = [(tag,) for i, tag in enumerate(ANIMAL_TAGS)]

ongs = [('ONG de ' + fake.name(), cnpj(), fake.address(), randint(1, CNT_CITIES), randint(CNT_USERS+1, CNT_USERS+CNT_ONGS)) for i in range(1, CNT_ONGS + 1)]

animals = [fake_animal() for i in range(1, CNT_ANIMALS + 1)]

animal_has_tag = []
for i in range(1, len(animals)+1):
    rem_tags = list(range(1, len(ANIMAL_TAGS) + 1))
    for _ in range(randint(*TAG_PER_ANIMAL)):
        tg = choice(rem_tags)
        rem_tags.remove(tg)
        animal_has_tag.append((i, tg))

user_work_ong = []
for i in range(1, len(ongs)+1):
    rem_users = list(range(1, CNT_USERS + 1))
    for _ in range(randint(*NORMAL_WORKER_PER_ONG)):
        us = choice(rem_users)
        rem_users.remove(us)
        user_work_ong.append((us, i, False))
    for _ in range(randint(*MANAGER_PER_ONG)):
        us = choice(rem_users)
        rem_users.remove(us)
        user_work_ong.append((us, i, True))

resp = ''.join(f'ALTER SEQUENCE public."{name}" RESTART WITH 1;\n' for name in seqs_to_reset)
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
