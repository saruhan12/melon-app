import os
import django
import sys
import pandas as pd

# Django ayarlarını yükle
sys.path.append(r"C:\Users\Erhun\Desktop\erhun_saruhan_frontend_backend_birlestirme\githubCommit17\melon-app\backend")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from base.models import CustomUser
from django.contrib.auth.hashers import make_password

# Yeni bir kullanıcı oluşturma fonksiyonu
def add_custom_user(username, email, password,id):
    try:
        # Kullanıcı oluştur
        hashed_password = make_password(password)  # Şifreyi hashle
        user = CustomUser.objects.create(
            username=username,
            email=email,
            password=hashed_password,
            is_staff=False,
            is_superuser=False,
            is_active=True
        )
        print(f"Kullanıcı başarıyla eklendi: {user}")
    except Exception as e:
        print(f"Bir hata oluştu: {e}")

base_dir = os.path.dirname(os.path.abspath(__file__))

# Dosya yolunu belirleyin
file_path = os.path.join(base_dir, "user_to_add.xlsx")

import glob
print(glob.glob("*"))


users_to_add_df=pd.read_excel(file_path)

for row in users_to_add_df.iterrows():
    username =     row[1]["username"]
    email =     row[1]["email"]
    password =     row[1]["password"]
    id =    row[1]["id"]
    


    add_custom_user(username, email, password, id)
