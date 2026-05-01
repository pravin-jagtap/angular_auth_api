CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    username VARCHAR(30) UNIQUE,
    mobile_number VARCHAR(20),
    password_hash TEXT NOT NULL,
    role VARCHAR(20), -- ADMIN / SELLER
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE merchants (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    merchant_name VARCHAR(150) NOT NULL,
    gst_number VARCHAR(50),
    mobile_number VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE receipts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    merchant_id BIGINT NOT NULL,
    file_path TEXT NOT NULL,
    original_file_name TEXT,
    status VARCHAR(20),
    -- PENDING, PROCESSING, PROCESSED, FAILED
    error_message TEXT,
    retry_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP,

    CONSTRAINT fk_user_receipt
    FOREIGN KEY (user_id) REFERENCES users(id),

    CONSTRAINT fk_merchant_receipt
    FOREIGN KEY (merchant_id) REFERENCES merchants(id)
);

CREATE TABLE receipt_data (
    id BIGSERIAL PRIMARY KEY,
    receipt_id BIGINT UNIQUE,

    total_amount NUMERIC(10,2),
    gst_amount NUMERIC(10,2),
    invoice_number VARCHAR(50),
    invoice_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    raw_json TEXT, -- full OCR response

    CONSTRAINT fk_receipt_data
    FOREIGN KEY (receipt_id) REFERENCES receipts(id)
);

CREATE TABLE receipt_items (
    id BIGSERIAL PRIMARY KEY,
    receipt_id BIGINT REFERENCES receipts(id) ON DELETE CASCADE,
    item_name VARCHAR(255),
    quantity NUMERIC(10,2),
    unit_price NUMERIC(10,2),
    total_price NUMERIC(10,2)
);

CREATE TABLE receipt_files (
    id BIGSERIAL PRIMARY KEY,
    receipt_id BIGINT REFERENCES receipts(id) ON DELETE CASCADE,
    file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscription (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    plan_name VARCHAR(50), -- BASIC / PREMIUM
    price NUMERIC(10,2),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20), -- ACTIVE / EXPIRED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_subscription
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE usage_log (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT,
    receipt_id BIGINT,
    action VARCHAR(50), -- UPLOAD / PROCESS
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE processing_log (
    id BIGSERIAL PRIMARY KEY,
    receipt_id BIGINT,
    status VARCHAR(20),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
