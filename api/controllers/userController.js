
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();
 
 
 
const getUsersPermission = async (req, res) => { 
  try {
    const result = await prisma.$queryRaw`
      SELECT
	Users.user_id AS user_id,
	Users.username AS username,
	User_Roles.role_id AS role_id,
	Roles.role_name AS role_name,
	Menu_Access.menu_id AS menu_id,
	Menus.menu_name AS menu_name,
	Shop_Menu.shop_id AS shop_id,
	Access_Roles.access_role_id AS access_role_id,
	Access_Roles.access_role_name AS access_role_name,
	Applications.app_name AS app_name,
	Shop_Application.app_id AS app_id,
	Shops.shop_name AS shop_name 
FROM
	(
		(
			(
				(
					(
						(
							(
								(
									(
										( Users JOIN User_Roles ON ( ( Users.user_id = User_Roles.user_id ) ) )
										JOIN User_Access ON ( ( Users.user_id = User_Access.user_id ) ) 
									)
									JOIN Roles ON ( ( User_Roles.role_id = Roles.role_id ) ) 
								)
								JOIN Shops 
							)
							JOIN Shop_Menu ON ( ( Shops.shop_id = Shop_Menu.shop_id ) ) 
						)
						JOIN Shop_Application ON ( ( Shops.shop_id = Shop_Application.shop_id ) ) 
					)
					JOIN Menus ON ( ( Shop_Menu.menu_id = Menus.menu_id ) ) 
				)
				JOIN Menu_Access ON ( ( ( Menus.menu_id = Menu_Access.menu_id ) AND ( Roles.role_id = Menu_Access.role_id ) ) ) 
			)
			JOIN Applications ON ( ( Shop_Application.app_id = Applications.app_id ) ) 
		)
	JOIN Access_Roles ON ( ( User_Access.access_role_id = Access_Roles.access_role_id ) ) 
	)
    `;
    
    res.status(200).json({ message: "User found successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get user", error });
  }
};


const getUsersPermissionByUserID = async (req, res) => { 
	try {

	  const {userId} = req.query
	  //const Users = await prisma.$queryRaw`SELECT * FROM Users`;
	  const result = await prisma.$queryRaw`
		SELECT
	  Users.user_id AS user_id,
	  Users.username AS username,
	  User_Roles.role_id AS role_id,
	  Roles.role_name AS role_name,
	  Menu_Access.menu_id AS menu_id,
	  Menus.menu_name AS menu_name,
	  Shop_Menu.shop_id AS shop_id,
	  Access_Roles.access_role_id AS access_role_id,
	  Access_Roles.access_role_name AS access_role_name,
	  Applications.app_name AS app_name,
	  Shop_Application.app_id AS app_id,
	  Shops.shop_name AS shop_name 
  FROM
	  (
		  (
			  (
				  (
					  (
						  (
							  (
								  (
									  (
										  ( Users JOIN User_Roles ON ( ( Users.user_id = User_Roles.user_id ) ) )
										  JOIN User_Access ON ( ( Users.user_id = User_Access.user_id ) ) 
									  )
									  JOIN Roles ON ( ( User_Roles.role_id = Roles.role_id ) ) 
								  )
								  JOIN Shops 
							  )
							  JOIN Shop_Menu ON ( ( Shops.shop_id = Shop_Menu.shop_id ) ) 
						  )
						  JOIN Shop_Application ON ( ( Shops.shop_id = Shop_Application.shop_id ) ) 
					  )
					  JOIN Menus ON ( ( Shop_Menu.menu_id = Menus.menu_id ) ) 
				  )
				  JOIN Menu_Access ON ( ( ( Menus.menu_id = Menu_Access.menu_id ) AND ( Roles.role_id = Menu_Access.role_id ) ) ) 
			  )
			  JOIN Applications ON ( ( Shop_Application.app_id = Applications.app_id ) ) 
		  )
	  JOIN Access_Roles ON ( ( User_Access.access_role_id = Access_Roles.access_role_id ) ) 
	  )

	  WHERE Users.user_id = ${userId} 
	  `;
	  console.log(result.length)
	  if(result.length > 0){
		res.status(200).json({response: true, message: "Customer found successfully", data: result });
	  } else {
		res.status(200).json({response: false, message: "Customer Not found", data: result });
	  }

	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: "Failed to get Customer", error });
	}
  };


const getUsers = async (req, res) => { 
  try {
    const result = await prisma.$queryRaw`SELECT
    Users.user_id,
    Users.username,
    Roles.role_name AS 'role' 
  FROM
    Users
    JOIN Roles ON Users.user_id = Roles.role_id`;
    
    res.status(200).json({ message: "User found successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get user", error });
  }
};
 
 module.exports ={
  getUsersPermission,
  getUsers,
  getUsersPermissionByUserID
 }