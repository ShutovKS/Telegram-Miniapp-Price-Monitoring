-- Создание таблицы пользователей
CREATE TABLE users
(
    user_id    VARCHAR(255) PRIMARY KEY,
    chat_id    VARCHAR(255),
    username   VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы маркетплейсов
CREATE TABLE marketplaces
(
    base_url   VARCHAR(255) PRIMARY KEY,
    name       VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы товаров
CREATE TABLE products
(
    product_url    TEXT PRIMARY KEY,
    marketplace_id VARCHAR(255) REFERENCES marketplaces (base_url) ON DELETE CASCADE,
    product_name   VARCHAR(255)   NOT NULL,
    current_price  DECIMAL(10, 2) NOT NULL,
    last_price     DECIMAL(10, 2),
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы отслеживаемых товаров пользователей
CREATE TABLE user_products
(
    user_id     VARCHAR(255) REFERENCES users (user_id) ON DELETE CASCADE,
    product_id  TEXT REFERENCES products (product_url) ON DELETE CASCADE,
    is_notified BOOLEAN   DEFAULT FALSE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id)
);

-- Создание таблицы истории изменений цен
CREATE TABLE price_history
(
    product_id TEXT REFERENCES products (product_url) ON DELETE CASCADE,
    price      DECIMAL(10, 2) NOT NULL,
    price_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id, price_date)
);

-- Создание таблицы уведомлений
CREATE TABLE notifications
(
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id           VARCHAR(255) REFERENCES users (user_id) ON DELETE CASCADE,
    product_id        TEXT REFERENCES products (product_url) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL,
    created_at        TIMESTAMP        DEFAULT CURRENT_TIMESTAMP
);
