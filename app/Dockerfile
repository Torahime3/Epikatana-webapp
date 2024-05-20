FROM php:8.3-fpm

ADD --chmod=0755 https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN apt-get update && apt-get install -y \
    libpq-dev \
    libicu-dev \
    git \
    zip \
    unzip

RUN install-php-extensions pdo_pgsql intl && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/html

WORKDIR /var/www/html

ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/dbkatana?serverVersion=13&charset=utf8"

ENTRYPOINT [ "bash","./docker.sh" ]