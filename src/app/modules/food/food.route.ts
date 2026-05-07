import { Router } from 'express';
import { FoodController } from './food.controller';

const router = Router();

// URL হবে: POST http://localhost:5000/api/v1/food/create-food
router.post('/create-food', FoodController.createFood);

// URL হবে: GET http://localhost:5000/api/v1/food
router.get('/', FoodController.getAllFood);

export const FoodRoutes = router;