FROM php:8.2-fpm

WORKDIR /app

RUN apt-get update -y && apt-get install -y \
        curl \
        zip \
        unzip \
        git
        
# Install symfony
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash
RUN apt-get install -y symfony-cli

# Install composer
RUN curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
RUN HASH=`curl -sS https://composer.github.io/installer.sig`
RUN php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer

COPY . .

# Populate data
RUN php bin/console doctrine:schema:update --force

EXPOSE 8000

CMD ["symfony", "server:start", "--no-tls"]