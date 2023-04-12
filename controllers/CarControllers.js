import Car from '../models/CarModels.js';
import Category from '../models/CategoryModels.js';


//get all cars 
export const getAllCars = async (req, res) => {
    try{
        const cars = await Car.find().populate('categoryId', 'name');
        res.json(cars);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};


//get car by id
export const getCarById = async (req, res) => {
    try{
        const car = await Car.findById(req.params.id).populate('categoryId', 'name');;
    
    if(!car) {
        return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
    }  catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'car not found' });
        }
        res.status(500).json({message: err.message})
    }
};



// Create a new car
export const createCar = async (req, res) => {
    try {
      const { name, description, price, categoryId } = req.body;
  
      // Check if category exists
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ msg: 'Category does not exist' });
      }
  
      const car = new Car({
        name,
        description,
        price,
        categoryId
      });
  
      await car.save();
  
      res.json(car);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  


//update a car 
export const updateCar = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;

        //check if category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({ msg: 'Category does not exist' });
          }
      
          const car = await Car.findById(req.params.id);
      
          if (!car) {
            return res.status(404).json({ msg: 'car not found' });
          }
      
          car.name = name;
          car.description = description;
          car.price = price;
          car.categoryId = categoryId;
      
          await car.save();
      
          res.json(car);
        } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'car not found' });
          }
          res.status(500).send('Server Error');
        }
      };
      
      // Delete a car
    export const deleteCar = async (req, res) => {
        try {
          const car = await Car.findById(req.params.id);
      
          if (!car) {
            return res.status(404).json({ msg: 'car not found' });
          }
      
          await car.remove();
      
          res.json({ msg: 'car removed' });
        } catch (err) {
          console.error(err.message);
          if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'car not found' });
          }
          res.status(500).send('Server Error');
        }
      };
         



