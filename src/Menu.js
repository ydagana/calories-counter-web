const Menu = [
  {
    heading: "Main Navigation",
    name: "Main Navigation"
  },
  {
    name: "Dashboard",
    icon: "fas fa-utensils",
    path: "/dashboard"
  },
  {
    name: "Profile",
    icon: "far fa-user",
    path: "/profile"
  },
  {
    name: "Manage Users",
    icon: "fas fa-users",
    path: "/users",
    role: "manager"
  },
  {
    name: "Logout",
    icon: "fas fa-sign-out-alt",
    action: "logout"
  }
];

export default Menu;
