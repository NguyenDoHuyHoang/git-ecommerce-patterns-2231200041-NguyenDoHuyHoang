import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        const { userId, productIds, shippingInfo } = orderDetails;
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.
        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        const stockAvailable = this.inventoryService.checkStock(productIds);

        if (!stockAvailable) {
            console.log("[Inventory] Failed: Products unavailable.");
            return false;
        }

        // 2. If they are, process the payment using `paymentService.processPayment()`.
        const amount = 200;
        const paymentSuccess = this.paymentService.processPayment(userId, amount);

        if (!paymentSuccess) {
            console.log("[Payment] Failed: Payment unsuccessful.");
            return false;
        }

        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        const shipment = this.shippingService.arrangeShipping(userId, shippingInfo);

        if (!shipment) {
            console.log("[Shipping] Failed: Shipping unsuccessful.");
            return false;
        }

        // 4. Log the result of each step. If a step fails, log it and stop.

    }
}

export { CheckoutFacade };
