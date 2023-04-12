import Order from '../models/OrderModels.js';



//get all the order
export const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('carId', 'name').populate('userId', 'name');
      res.json(orders);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };



// Get a specific order by ID
export const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate({
          path: "cars",
          model: "Car",
          select: "name price",
        })
        .populate({
          path: "user",
          model: "User",
          select: "name email",
        })
        .exec();
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Create a new order
 export const createOrder = async (req, res) => {
    const { cars, user } = req.body;
  
    try {
      // Check if the cars and user fields are present in the request body
      if (!cars || !user) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Create a new order
      const order = new Order({
        cars,
        user,
      });
  
      // Save the order to the database
      await order.save();
  
      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update an existing order
 export const updateOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Update the order with the new data
      order.cars = req.body.cars || order.cars;
      order.user = req.body.user || order.user;
  
      // Save the updated order to the database
      await order.save();
  
      res.json({ message: "Order updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete an existing order
 export const deleteOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Delete the order from the database
      await order.remove();
  
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  



