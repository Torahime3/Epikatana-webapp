#!/bin/bash
php bin/console doctrine:schema:update --force
php bin/console doctrine:fixtures:load --no-interaction

php-fpm -F