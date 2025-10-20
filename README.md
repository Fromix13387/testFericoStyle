git clone https://github.com/Fromix13387/testFericoStyle.git

docker compose up -d --build


docker compose exec php bash -lc "composer install"
docker compose exec php bash -lc "php artisan key:generate"
docker compose exec php bash -lc "php artisan migrate"

docker compose exec php bash -lc "php artisan db:seed" // Для создания задач у пользователей