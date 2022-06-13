import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createCompany, updateCompany} from '../core/_requests'
import {useCustomerContext} from '../core/CustomerProvider'
import {CompanyModel} from '../../../../../models/customers/Company.class'
import {FormInput} from '../../../../../components/FormInput'

type Props = {
  isUserLoading: boolean
  company: CompanyModel
}

const editUserSchema = Yup.object().shape({
  company_name: Yup.string().min(3, 'Minimum 3 symbols').required('Company name is required'),
  company_address: Yup.string().required('Company address is required'),
})

const CompanyEditModalForm: FC<Props> = ({company, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetchCompanies} = useCustomerContext()

  const [userForEdit] = useState<CompanyModel>({
    ...company,
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetchCompanies()
    }
    setItemIdForUpdate(undefined)
  }

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          await updateCompany(values)
        } else {
          await createCompany(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          <FormInput formik={formik as any} name='company_name' label='Tên công ty' />
          <FormInput formik={formik as any} name='company_address' label='Địa chỉ công ty' />
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export {CompanyEditModalForm}
