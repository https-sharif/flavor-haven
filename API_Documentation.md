# API Documentation for Flavor Haven

Flavor Haven is a restaurant website designed to help you manage users, orders, reservations, and customer inquiries efficiently. Whether you're looking to retrieve user information, view orders, handle reservations, or process customer messages, this API provides the tools you need to streamline your operations. Below, you'll find detailed information on how to use each endpoint, along with example requests and responses.

## Base URL

Base URL: `https://flavor-haven.onrender.com/`  
All API endpoints should be prefixed with `/api`.

## 1. User Management API

### 1.1 Get User by ID

**Description:** Retrieve details of a specific user by their userId.  
**HTTP Method:** GET  
**URL:** `/user/get-user/:userId`

**Request Example:**

```json
{  
    "userId": "12345"  
}
```

**Response Example:**

```json
{  
    "message": "User found",  
    "user": {  
        "userId": "12345",  
        "name": "Jane Doe",  
        "email": "jane.doe@example.com",  
        "address": "123 Main St",  
        "phone": "123-456-7890",  
        "photoUrl": "http://example.com/photo.jpg",  
        "role": "customer"  
    }  
}
```

### 1.2 Create New User

**Description:** Add a new user to the system.  
**HTTP Method:** POST  
**URL:** `/user/create-user`

**Request Example:**

```json
{  
    "userId": "67890",  
    "email": "john.smith@example.com",  
    "name": "John Smith",  
    "photoURL": "http://example.com/john-photo.jpg"  
}
```

**Response Example:**

```json
{  
    "message": "New user created",  
    "user": {  
        "userId": "67890",  
        "name": "John Smith",  
        "email": "john.smith@example.com",  
        "address": "",  
        "phone": "",  
        "photoUrl": "http://example.com/john-photo.jpg",  
        "role": "customer"  
    }  
}
```

### 1.3 Update User Information

**Description:** Update user details such as name, address, and phone.  
**HTTP Method:** PUT  
**URL:** `/user/update-user`

**Request Example:**

```json
{  
    "userId": "12345",  
    "name": "Jane Doe Updated",  
    "address": "456 New St",  
    "phone": "987-654-3210"  
}
```

**Response Example:**

```json
{  
    "message": "User updated",  
    "user": {  
        "userId": "12345",  
        "name": "Jane Doe Updated",  
        "email": "jane.doe@example.com",  
        "address": "456 New St",  
        "phone": "987-654-3210",  
        "photoUrl": "http://example.com/photo.jpg",  
        "role": "customer"  
    }  
}
```

### 1.4 Get All Users

**Description:** Retrieve a list of all users in the system.  
**HTTP Method:** GET  
**URL:** `/user/get-all-users`

**Response Example:**

```json
{  
    "message": "All users",  
    "users": [  
        {  
            "userId": "12345",  
            "name": "Jane Doe",  
            "email": "jane.doe@example.com",  
            "address": "456 New St",  
            "phone": "987-654-3210",  
            "photoUrl": "http://example.com/photo.jpg",  
            "role": "customer"  
        },  
        {  
            "userId": "67890",  
            "name": "John Smith",  
            "email": "john.smith@example.com",  
            "address": "",  
            "phone": "",  
            "photoUrl": "http://example.com/john-photo.jpg",  
            "role": "customer"  
        }  
    ]  
}
```

## 2. Order Management API

### 2.1 Create New Order

**Description:** Place a new order with details like items, total cost, and status.  
**HTTP Method:** POST  
**URL:** `/order/create-order`

**Request Example:**

```json
{  
    "userId": "12345",  
    "name": "Jane Doe",  
    "items": [  
        { "itemId": "1", "quantity": 2 },  
        { "itemId": "3", "quantity": 1 }  
    ],  
    "total": 45.00,  
    "status": "pending",  
    "estimatedDeliveryTime": "2025-01-10T10:00:00Z"  
}
```

**Response Example:**

```json
{  
    "message": "Order created successfully",  
    "order": {  
        "orderId": "abc123",  
        "userId": "12345",  
        "name": "Jane Doe",  
        "items": [  
            { "itemId": "1", "quantity": 2 },  
            { "itemId": "3", "quantity": 1 }  
        ],  
        "total": 45.00,  
        "status": "pending",  
        "createdAt": "2025-01-05T08:00:00Z",  
        "estimatedDeliveryTime": "2025-01-10T10:00:00Z"  
    }  
}
```

### 2.2 Update Order Status

**Description:** Update the status of an existing order.  
**HTTP Method:** PUT  
**URL:** `/order/update-order/:orderId`

**Request Example:**

```json
{  
    "status": "preparing"  
}
```

**Response Example:**

```json
{  
    "message": "Order updated successfully",  
    "order": {  
        "orderId": "abc123",  
        "userId": "12345",  
        "name": "Jane Doe",  
        "items": [  
            { "itemId": "1", "quantity": 2 },  
            { "itemId": "3", "quantity": 1 }  
        ],  
        "total": 45.00,  
        "status": "preparing",  
        "createdAt": "2025-01-05T08:00:00Z",  
        "estimatedDeliveryTime": "2025-01-10T10:00:00Z"  
    }  
}
```

### 2.3 Delete Order

**Description:** Remove an order from the system.  
**HTTP Method:** DELETE  
**URL:** `/order/delete-order/:orderId`

**Request Example:** No request body.

**Response Example:**

```json
{  
    "message": "Order deleted successfully",  
    "order": {  
        "orderId": "abc123",  
        "userId": "12345",  
        "name": "Jane Doe",  
        "items": [  
            { "itemId": "1", "quantity": 2 },  
            { "itemId": "3", "quantity": 1 }  
        ],  
        "total": 45.00,  
        "status": "delivered",  
        "createdAt": "2025-01-05T08:00:00Z",  
        "estimatedDeliveryTime": "2025-01-10T10:00:00Z"  
    }  
}
```

### 2.4 Fetch Orders for a User

**Description:** Retrieve all orders placed by a specific user.  
**HTTP Method:** GET  
**URL:** `/order/fetch-user-orders/:userId`

**Request Example:**

```json
{  
    "userId": "12345"  
}
```

**Response Example:**

```json
{  
    "message": "Orders retrieved successfully",  
    "orders": [  
        {  
            "orderId": "abc123",  
            "userId": "12345",  
            "name": "Jane Doe",  
            "items": [  
                { "itemId": "1", "quantity": 2 },  
                { "itemId": "3", "quantity": 1 }  
            ],  
            "total": 45.00,  
            "status": "ready",  
            "createdAt": "2025-01-05T08:00:00Z",  
            "estimatedDeliveryTime": "2025-01-10T10:00:00Z"  
        }  
    ]  
}
```

### 2.5 Fetch All Orders

**Description:** Retrieve a list of all orders.  
**HTTP Method:** GET  
**URL:** `/order/fetch-all-orders`

**Response Example:**

```json
{  
    "message": "Orders retrieved successfully",  
    "orders": [  
        {  
            "orderId": "abc123",  
            "userId": "12345",  
            "name": "Jane Doe",  
            "items": [  
                { "itemId": "1", "quantity": 2 },  
                { "itemId": "3", "quantity": 1 }  
            ],  
            "total": 45.00,  
            "status": "delivered",  
            "createdAt": "2025-01-05T08:00:00Z",  
            "estimatedDeliveryTime": "2025-01-10T10:00:00Z"  
        },  
        {  
            "orderId": "def456",  
            "userId": "67890",  
            "name": "John Smith",  
            "items": [  
                { "itemId": "2", "quantity": 1 }  
            ],  
            "total": 20.00,  
            "status": "pending",  
            "createdAt": "2025-01-04T10:00:00Z",  
            "estimatedDeliveryTime": "2025-01-09T12:00:00Z"  
        }  
    ]  
}
```

## 3. Reservation Management API

### 3.1 Create New Reservation

**Description:** Add a new reservation with details like date, time, and number of guests.  
**HTTP Method:** POST  
**URL:** `/reservation/create-reservation`

**Request Example:**

```json
{  
    "userId": "12345",  
    "date": "2025-01-15",  
    "time": "18:00:00",  
    "guests": 4,  
    "name": "Jane Doe",  
    "table": "A1",  
    "status": "pending"  
}
```

**Response Example:**

```json
{  
    "message": "New reservation created",  
    "reservation": {  
        "reservationId": "xyz789",  
        "userId": "12345",  
        "date": "2025-01-15",  
        "time": "18:00:00",  
        "guests": 4,  
        "name": "Jane Doe",  
        "table": "A1",  
        "status": "pending"  
    }  
}
```

### 3.2 Update Reservation Status

**Description:** Update the status of an existing reservation.  
**HTTP Method:** PUT  
**URL:** `/reservation/update-reservation/:reservationId`

**Request Example:**

```json
{  
    "status": "cancelled"  
}
```

**Response Example:**

```json
{  
    "message": "Reservation updated successfully",  
    "reservation": {  
        "reservationId": "xyz789",  
        "userId": "12345",  
        "date": "2025-01-15",  
        "time": "18:00:00",  
        "guests": 4,  
        "name": "Jane Doe",  
        "table": "A1",  
        "status": "cancelled"  
    }  
}
```

### 3.3 Delete Reservation

**Description:** Remove a reservation from the system.  
**HTTP Method:** DELETE  
**URL:** `/reservation/delete-reservation/:reservationId`

**Request Example:** No request body.

**Response Example:**

```json
{  
    "message": "Reservation deleted successfully",  
    "reservation": {  
        "reservationId": "xyz789",  
        "userId": "12345",  
        "date": "2025-01-15",  
        "time": "18:00:00",  
        "guests": 4,  
        "name": "Jane Doe",  
        "table": "A1",  
        "status": "cancelled"  
    }  
}
```

### 3.4 Fetch All Reservations

**Description:** Retrieve a list of all reservations.  
**HTTP Method:** GET  
**URL:** `/reservation/fetch-all-reservation`

**Response Example:**

```json
{  
    "message": "All reservations fetched successfully",  
    "reservations": [  
        {  
            "reservationId": "xyz789",  
            "userId": "12345",  
            "date": "2025-01-15",  
            "time": "18:00:00",  
            "guests": 4,  
            "name": "Jane Doe",  
            "table": "A1",  
            "status": "cancelled"  
        },  
        {  
            "reservationId": "uvw456",  
            "userId": "67890",  
            "date": "2025-01-16",  
            "time": "19:00:00",  
            "guests": 2,  
            "name": "John Smith",  
            "table": "B2",  
            "status": "confirmed"  
        }  
    ]  
}
```

## 4. Order and Reservation Tracking API

### 4.1 Track Order By ID

**Description:** Retrieve details of a specific order by its unique ID.  
**HTTP Method:** GET  
**URL:** `/track/order/:orderId`

**Request Example:**

```json
{
    "orderId": "5f50d6b4a7e1f22e445b6f4a"
}
```

**Response Example:**

```json
{
    "message": "Order found",
    "order": {
        "id": "5f50d6b4a7e1f22e445b6f4a",
        "userId": "605c72b1a6c549001c4a6f01",
        "name": "John Doe",
        "items": ["Burger", "Fries"],
        "total": 25.5,
        "status": "shipped",
        "createdAt": "2025-01-05T10:00:00Z",
        "estimatedDeliveryTime": "2025-01-10T12:00:00Z"
    }
}
```

### 4.2 Track Reservation By ID

**Description:** Retrieve details of a specific reservation by its unique ID.  
**HTTP Method:** GET  
**URL:** `/track/reservation/:reservationId`

**Request Example:**

```json
{
    "reservationId": "5f50d6b4a7e1f22e445b6f4b"
}
```

**Response Example:**

```json
{
    "message": "Reservation found",
    "reservation": {
        "id": "5f50d6b4a7e1f22e445b6f4b",
        "userId": "605c72b1a6c549001c4a6f01",
        "date": "2025-01-10",
        "time": "19:00",
        "guests": 4,
        "name": "Jane Smith",
        "table": "A12",
        "status": "confirmed"
    }
}
```

## 5. Contact Management API

### 5.1 Create Contact Message

**Description:** Submit a contact message from a user.  
**HTTP Method:** POST  
**URL:** `/contact`

**Request Example:**

```json
{  
    "name": "Alice Johnson",  
    "email": "alice.johnson@example.com",  
    "subject": "Inquiry about menu",  
    "message": "Can you please provide more details about your menu options?"  
}
```

**Response Example:**

```json
{  
    "message": "Contact created successfully",  
    "contact": {  
        "name": "Alice Johnson",  
        "email": "alice.johnson@example.com",  
        "subject": "Inquiry about menu",  
        "message": "Can you please provide more details about your menu options?",  
        "createdAt": "2025-01-05T09:00:00Z"  
    }  
}
```

## Error Handling

### 1. Status Codes

- **200 OK:** The request was successful, and the response contains the requested data.
- **400 Bad Request:** The request was malformed or missing required parameters.
- **401 Unauthorized:** The request lacks valid authentication credentials.
- **404 Not Found:** The requested resource (order, reservation, etc.) could not be found.
- **500 Internal Server Error:** An unexpected error occurred on the server.

### 2. Error Responses

Each endpoint returns a JSON response in case of errors, providing a descriptive message to help diagnose the issue.

**Example of an error response:**

```json
{
    "message": "Order not found"
}
```

## Notes

- Ensure all required fields are included in requests, as missing or incorrect data can result in a 400 Bad Request error.
- The `orderId` and `reservationId` must be unique identifiers for each order or reservation. Make sure they are accurate to fetch the correct data.
- No authentication is required to access these API endpoints. All requests can be made without authentication credentials.

## Conclusion

This API documentation outlines the endpoints for tracking orders and reservations on Flavor Haven. By following the provided examples and guidelines, you can efficiently manage and retrieve order and reservation details.
