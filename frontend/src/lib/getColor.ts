type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

interface StatusColor {
    backgroundColor: string;
    textColor: string;
}

function getColor(status: OrderStatus): StatusColor {
    switch (status) {
        case 'pending':
            return { backgroundColor: '#f0ad4e', textColor: '#ffffff' }; // orange background, white text
        case 'preparing':
            return { backgroundColor: '#5bc0de', textColor: '#ffffff' }; // blue background, white text
        case 'ready':
            return { backgroundColor: '#5cb85c', textColor: '#ffffff' }; // green background, white text
        case 'delivered':
            return { backgroundColor: '#0275d8', textColor: '#ffffff' }; // dark blue background, white text
        case 'cancelled':
            return { backgroundColor: '#d9534f', textColor: '#ffffff' }; // red background, white text
        default:
            return { backgroundColor: '#ffffff', textColor: '#000000' }; // default white background, black text
    }
}

export default getColor;