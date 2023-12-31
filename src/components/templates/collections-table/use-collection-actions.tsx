import { useAdminDeleteCollection } from "medusa-react"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import EditIcon from "../../fundamentals/icons/edit-icon"
import TrashIcon from "../../fundamentals/icons/trash-icon"
import { ActionType } from "../../molecules/actionables"
import useUserRole from "../../../hooks/use-user-role"

const useCollectionActions = (collection) => {
  const navigate = useNavigate()
  const dialog = useImperativeDialog()
  const { isMem } = useUserRole()
  const deleteCollection = useAdminDeleteCollection(collection?.id)

  const handleDelete = async () => {
    const shouldDelete = await dialog({
      heading: "Delete Collection",
      text: "Are you sure you want to delete this collection?",
    })

    if (shouldDelete) {
      deleteCollection.mutate()
    }
  }

  const getActions = (coll) => {
    const actions: ActionType[] = [
      {
        label: "Edit",
        onClick: () => navigate(`/a/collections/${coll.id}`),
        icon: <EditIcon size={20} />,
      },
    ]

    if (!isMem) {
      actions.push(

        {
          label: "Delete",
          variant: "danger",
          onClick: handleDelete,
          icon: <TrashIcon size={20} />,
        },
      )
    }
    return actions
  }

  return {
    getActions,
  }
}

export default useCollectionActions
