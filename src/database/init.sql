-- Создание таблицы пользователей
CREATE TABLE users
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    telegram_id VARCHAR(255) UNIQUE NOT NULL,
    username    VARCHAR(255),
    created_at  TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы маркетплейсов
CREATE TABLE marketplaces
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(255) UNIQUE NOT NULL,
    base_url   VARCHAR(255)        NOT NULL,
    created_at TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы товаров
CREATE TABLE products
(
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    marketplace_id UUID REFERENCES marketplaces (id) ON DELETE CASCADE,
    product_name   VARCHAR(255)   NOT NULL,
    product_url    TEXT           NOT NULL,
    current_price  DECIMAL(10, 2) NOT NULL,
    last_price     DECIMAL(10, 2),
    min_price      DECIMAL(10, 2),
    max_price      DECIMAL(10, 2),
    created_at     TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы отслеживаемых товаров пользователей
CREATE TABLE user_products
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users (id) ON DELETE CASCADE,
    product_id  UUID REFERENCES products (id) ON DELETE CASCADE,
    is_notified BOOLEAN          DEFAULT FALSE,
    created_at  TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы истории изменений цен
CREATE TABLE price_history
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products (id) ON DELETE CASCADE,
    price      DECIMAL(10, 2) NOT NULL,
    price_date TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы уведомлений
CREATE TABLE notifications
(
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id           UUID REFERENCES users (id) ON DELETE CASCADE,
    product_id        UUID REFERENCES products (id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL,
    created_at        TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);