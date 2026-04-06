# AgroComPro — Deploy qo'llanmasi

> AgroERP bilan bitta serverdagi deploy uchun mo'ljallangan.
> Caddy AgroERP tomon boshqariladi. GitHub Actions push qilinganda avtomatik deploy bo'ladi.

## Arxitektura

```
Internet (80/443)
      │
   AgroERP Caddy  (agroerp_caddy)
      ├── manager.fastergo.uz    → agroerp app:8080
      ├── agrocom.fastergo.uz    → agrocom-frontend:80
      └── agrocomapi.fastergo.uz → agrocom-backend:8080

GitHub Actions (push → main)
      ├── Backend o'zgardi → image build → ghcr.io/repo-backend:latest
      ├── Frontend o'zgardi → image build → ghcr.io/repo-frontend:latest
      └── SSH → server pull + restart + caddy reload
```

## Bir martalik server sozlamalari

### 1. Papka va fayllarni tayyorlash

```bash
mkdir -p /opt/agrocompro
mkdir -p /var/www/files
cd /opt/agrocompro
```

### 2. `.env` faylini yaratish

```bash
cat > .env << 'EOF'
GITHUB_REPO=yourusername/agrocompro

MYSQL_ROOT_PASSWORD=<kuchli_root_parol>
MYSQL_PASSWORD=<kuchli_user_parol>
EOF
```

`GITHUB_REPO` ni GitHub repo manzilingiz bilan almashtiring (kichik harf, masalan: `jaloliddin/agrocompro`).

### 3. Birinchi marta docker-compose.yml yuklash va ishga tushirish

```bash
# docker-compose.yml ni serverga ko'chiring, so'ng:
cd /opt/agrocompro
docker compose up -d mysql
```

MySQL tayyor bo'lishi kutiladi (healthcheck). Backend va frontend keyingi push da avtomatik o'rnatiladi.

## GitHub Secrets sozlamasi

Repo → Settings → Secrets and variables → Actions:

| Secret nomi     | Qiymati                          |
|-----------------|----------------------------------|
| `SERVER_HOST`   | `152.42.242.5` (server IP)       |
| `SERVER_USER`   | `root`                           |
| `SERVER_SSH_KEY`| SSH private key (`.ssh/id_rsa`)  |
| `GHCR_TOKEN`    | GitHub → Settings → Developer settings → Personal access tokens (Classic) → `read:packages` huquqi |

> `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY` AgroERP repo dagi bilan bir xil bo'lsa ham, bu repoda ham alohida qo'shilishi kerak.

## CI/CD qanday ishlaydi

```
git push origin main
      │
      ├── AgroComB/** o'zgardi → Backend image build → GHCR push
      ├── AgroComF/** o'zgardi → Frontend image build → GHCR push
      │
      └── Deploy job:
            ├── docker-compose.yml → server ga yuboriladi
            ├── O'zgargan servislar pull + restart
            └── AgroERP Caddy reload
```

**Faqat o'zgargan qism build qilinadi** — frontend o'zgarmagan bo'lsa backend o'rnatilmaydi.

## Foydali buyruqlar

```bash
# Holat
docker compose -f /opt/agrocompro/docker-compose.yml ps

# Loglar
docker logs agrocom-backend -f
docker logs agrocom-frontend -f
docker logs agrocom-mysql -f

# Qayta ishga tushirish
cd /opt/agrocompro && docker compose restart backend

# AgroERP Caddyni qo'lda reload qilish
docker exec agroerp_caddy caddy reload --config /etc/caddy/Caddyfile
```

## DNS sozlamalar (fastergo.uz panel)

| Domen                    | Tur | Qiymat    |
|--------------------------|-----|-----------|
| agrocom.fastergo.uz      | A   | 152.42.242.5 |
| agrocomapi.fastergo.uz   | A   | 152.42.242.5 |
