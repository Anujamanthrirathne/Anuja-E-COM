const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const userModel = require('../../models/userModel');

const paymentController = async (request, response) => {
    try {
        const { cartItems } = request.body;
        const user = await userModel.findOne({ _id: request.userId });

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1PbQH2LZpu7YiNFSOF62Yfpf'
                }
            ],
            customer_email: user.email,
            metadata: {
                userId: request.userId
            },
            line_items: cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'LKR',
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage.filter(img => img), // Filter out empty strings
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        unit_amount: item.productId.sellingPrice * 100 // Ensure amount is in cents
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                };
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);

        response.status(303).json({ success: true, url: session.url });
    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = paymentController;
