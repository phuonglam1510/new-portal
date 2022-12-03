import React from "react";
import { useFormik } from "formik";
import { KTSVG } from "../../../../../../../_metronic/helpers";
import { ContactModel } from "../../../../../../models/customers/Contact.class";
import { Builder } from "builder-pattern";
import { useListView } from "../../core/ListViewProvider";
import { useModalContext } from "../../core/ModalProvider";

interface Props {
  formik: ReturnType<typeof useFormik>;
  name: string;
  label: string;
}

interface ItemProps {
  formik: ReturnType<typeof useFormik>;
  name: string;
  index: number;
  onEdit: () => any;
  onRemove: () => any;
  readOnly?: boolean;
}

const ContactItemRow: React.FC<ItemProps> = ({
  formik,
  name,
  index,
  onEdit,
  onRemove,
  readOnly,
}) => {
  return (
    <tr>
      <td>
        <a
          href="#"
          className="text-dark fw-bolder text-hover-primary mb-1 fs-6"
        >
          {formik.values[name][index].contact_name}
        </a>
        <span className="text-muted fw-bold d-block">
          {formik.values[name][index].contact_email}
        </span>
      </td>
      <td className="text-end text-muted fw-bold">
        {formik.values[name][index].contact_position}
      </td>
      <td className="text-end">
        <span className="badge badge-light-success">
          {formik.values[name][index].contact_phone}
        </span>
      </td>
      <td>
        {!readOnly && (
          <div className="d-flex justify-content-end flex-shrink-0">
            <a
              onClick={onEdit}
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
            >
              <KTSVG
                path="/media/icons/duotune/art/art005.svg"
                className="svg-icon-3"
              />
            </a>
            <a
              onClick={onRemove}
              className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
            >
              <KTSVG
                path="/media/icons/duotune/general/gen027.svg"
                className="svg-icon-3"
              />
            </a>
          </div>
        )}
      </td>
    </tr>
  );
};

let editIndex: number | null = null;

const ContactEditableList: React.FC<Props> = ({ formik, name }) => {
  const listItems = formik.values[name] as ContactModel[];
  const { itemIdForUpdate } = useListView();
  const { openModal, closeModal } = useModalContext();

  const onSave = (changedContact: ContactModel) => {
    console.log(changedContact);
    if (editIndex !== null) {
      if (changedContact.id) {
        formik.setFieldValue("changedContactIds", [
          ...formik.values.changedContactIds.filter(
            (id: number) => id !== changedContact.id
          ),
          changedContact.id,
        ]);
      }
      formik.setFieldValue(
        name,
        listItems.map((item: ContactModel, index: number) => {
          if (index === editIndex) {
            return changedContact;
          }
          return item;
        }),
        true
      );
    } else {
      formik.setFieldValue(name, [...listItems, changedContact], true);
    }
    editIndex = null;
    closeModal();
  };

  const onAdd = () => {
    openModal(
      Builder(ContactModel)
        .company_id((itemIdForUpdate as number) || -1)
        .build(),
      onSave
    );
  };

  const onEdit = (index: number) => {
    const item = listItems[index];

    editIndex = index;
    openModal(item, onSave);
  };

  const onRemove = (index: number) => {
    const item = listItems[index];
    if (item.id) {
      formik.setFieldValue("removedContactIds", [
        ...formik.values.removedContactIds,
        item.id,
      ]);
    }
    formik.setFieldValue(
      "contacts",
      formik.values[name].filter((_: any, ind: number) => index !== ind)
    );
  };

  return (
    <>
      <div className="separator separator-dashed my-3"></div>
      <div
        className="d-flex align-items-center justify-content-between"
        data-kt-user-table-toolbar="base"
      >
        <a className="fw-bolder text-black fs-4">Người liên hệ</a>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          <KTSVG
            path="/media/icons/duotune/arrows/arr075.svg"
            className="svg-icon-2"
          />
          Thêm
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4">
          <thead>
            <tr className="border-0">
              <th className="p-0 min-w-120px"></th>
              <th className="p-0 min-w-100px"></th>
              <th className="p-0 min-w-110px"></th>
              <th className="p-0 min-w-50px"></th>
            </tr>
          </thead>
          <tbody>
            {listItems.map((item: ContactModel, index: number) => (
              <ContactItemRow
                key={item.contact_email}
                formik={formik}
                name={name}
                index={index}
                onRemove={() => onRemove(index)}
                onEdit={() => onEdit(index)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { ContactEditableList };
