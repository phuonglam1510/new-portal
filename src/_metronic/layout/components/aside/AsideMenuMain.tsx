/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import {AsideMenuItemWithSub} from "./AsideMenuItemWithSub";
import {AsideMenuItem} from "./AsideMenuItem";
import {Routing} from "../../../../app/enums/Routing.enum";
import {useCurrentUser} from "../../../../app/modules/apps/core/CurrentUserProvider";
import {UserRole} from "../../../../app/enums/UserRole.enum";

export function AsideMenuMain() {
    const user = useCurrentUser();
    const isMonitor = user.role === UserRole.Monitor;
  return (
    <>
        {!isMonitor &&
            <><AsideMenuItem
                to="/apps/user-management/users"
                icon="/media/icons/duotune/general/gen051.svg"
                title="Quản lý người dùng"
                fontIcon="bi-layers"/><AsideMenuItemWithSub
                icon="/media/icons/duotune/general/gen005.svg"
                fontIcon="bi-layers"
                to={Routing.Customer}
                title="Khách hàng"
            >
                <AsideMenuItem
                    to={Routing.CustomerCompanies}
                    title="Công ty"
                    hasBullet={true}/>
                <AsideMenuItem
                    to={Routing.CustomerContacts}
                    title="Người liên hệ"
                    hasBullet={true}/>
            </AsideMenuItemWithSub></>
        }
      <AsideMenuItemWithSub
        icon="/media/icons/duotune/ecommerce/ecm001.svg"
        fontIcon="bi-layers"
        to={Routing.Sales}
        title="Bán hàng"
      >
        <AsideMenuItem
          to={Routing.SaleQuotes}
          title="Báo giá"
          hasBullet={true}
        />
        {/* <AsideMenuItem to={Routing.SaleQuotes} title="CSKH" hasBullet={true} /> */}
      </AsideMenuItemWithSub>

      {/* <AsideMenuSubHeader title="Crafted" />
      <AsideMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
          <AsideMenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <AsideMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub>
      */}
    </>
  );
}
