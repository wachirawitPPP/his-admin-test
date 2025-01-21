const express = require('express');

// const authController = require('./controllers/authController') 
// const CustomerController = require('./controllers/customerController') 
// const middleware = require('./middlewares/middleware')
const router = express.Router();
/* formModel */
// const FormController = require('./controllers/formController') 
const  UserController = require('./controllers/userController')

router.get('/UserPermissions', UserController.getUsersPermission)
router.get('/Users', UserController.getUsers)
router.get('/UsersByUserID', UserController.getUsersPermissionByUserID)
// //----------------Auth Login---------------------
// router.post("/register",authController.register); 
// router.post("/login",authController.login);
 
// //----------------Customer-----------------------
// router.get("/customers",middleware.verifyToken,CustomerController.getCustomers)
// router.get("/customers/perpage",middleware.verifyToken,CustomerController.getCustomersPerpage)
// router.get("/customers/:id_card",CustomerController.getCustomerByIdCard)
// router.post("/register/customers",CustomerController.RegisterCustomers) 
// router.post("/customers",CustomerController.getCustomerByIdCard)
// router.put("/customers/:id",CustomerController.updateCustomer)
// router.patch("/customer/updatestatus", CustomerController.UpdateCustomerStatus)

// router.post("/customers-list",CustomerController.getCustomerListByIdCard)

// //----------------Assessment Form-----------------
// router.get("/assment_topic",FormController.getAssmentTopics)
// router.post("/create_assment", FormController.createCustomerAssmtform)
// router.get("/assment_summary/:customer_id", FormController.getAssmtSummaryByCustomerId)
// router.get("/assment_summaryIdCard", FormController.getAssmtSummaryByIdCard)
// router.get("/dashboard", FormController.DashBoardSpecaial_righth)
 


module.exports = router;