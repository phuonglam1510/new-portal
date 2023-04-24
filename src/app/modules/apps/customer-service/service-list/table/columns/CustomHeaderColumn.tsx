import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import {CustomerServiceModel} from "../../../../../../models/customers/CustomerService.class";

type Props = {
  column: ColumnInstance<CustomerServiceModel>
}

const CustomHeaderColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {CustomHeaderColumn}
