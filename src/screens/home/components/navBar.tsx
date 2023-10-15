import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearUserData, getUserData } from "../../../utils/localStorageUtils";
import { NavBarProps } from "../interface/type";
import { IconDashboard, IconSwitchHorizontal } from "@tabler/icons-react";
import { IconWindow } from "@tabler/icons-react";
import { IconClock } from "@tabler/icons-react";
import { IconKey } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { IconLogout } from "@tabler/icons-react";
import classes from "../css/NavbarSegmented.module.css";
import { AccountType } from "../../../lib/enums/enum";

const tabs = {
  general: [
    {
      link: "",
      label: "Dashboard",
      icon: IconDashboard,
    },
    {
      link: "",
      label: "House",
      icon: IconWindow,
    },
    {
      link: "",
      label: "PendingNest",
      icon: IconClock,
    },
    {
      link: "",
      label: "Luxe Living",
      icon: IconKey,
    },
    {
      link: "",
      label: "Account",
      icon: IconUser,
    },
  ],
};

const NavBar: FC<NavBarProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("Dashboard");

  const linksToHideForTenant = ["PendingNest", "House"];

  const links = tabs.general.map((item) => {
    // Check if the user is not a tenant to show the "PendingNest" link
    if (
      getUserData()?.login.user.accountType === AccountType.OWNER ||
      !linksToHideForTenant.includes(item.label)
    ) {
      return (
        <a
          className={classes.link}
          data-active={item.label === active || undefined}
          href={item.link}
          key={item.label}
          onClick={(event) => {
            event.preventDefault();
            setActive(item.label);
            onClick(item.label);
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </a>
      );
    }
    return null; // Return null to hide the link for tenants
  });

  const handleLogOut = () => {
    clearUserData();
    navigate("/", { replace: true });
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="/"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            handleLogOut();
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
