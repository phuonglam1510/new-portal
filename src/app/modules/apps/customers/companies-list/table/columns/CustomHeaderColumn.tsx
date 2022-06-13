import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import {CompanyModel} from '../../../../../../models/customers/Company.class'

type Props = {
  column: ColumnInstance<CompanyModel>
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
