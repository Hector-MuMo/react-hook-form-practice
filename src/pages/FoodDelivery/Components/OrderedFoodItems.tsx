import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import type { OrderedFoodItemType } from "../../../types";
import TextField from "../../../controls/TextField";

export default function OrderedFoodItems() {
  const { register } = useFormContext<{ foodItems: OrderedFoodItemType[] }>();

  const { errors } = useFormState<{ foodItems: OrderedFoodItemType[] }>({
    name: "foodItems",
  });

  //append - Append input/inputs to the end of your fields and focus. The input value will be registered during this action. append data is required and not partial.
  //prepend - Prepend input/inputs to the start of your fields and focus. The input value will be registered during this action.
  //insert -  Insert input/inputs at particular position and focus.
  //swap - Swap input/inputs position.
  //move - 	Move input/inputs to another position.
  //update - 	Update input/inputs at a particular position, updated fields will get unmounted and remounted. If this is not desired behavior, please use setValue API instead.
  //replace - Replace the entire field array values.
  //remove - 	Remove input/inputs at particular position, or remove all when no index provided.
  const {
    fields,
    append,
    prepend,
    insert,
    swap,
    move,
    update,
    replace,
    remove,
  } = useFieldArray({ name: "foodItems" });

  const onRowAdd = () => {
    append({ name: "Food", quantity: 1 });
    //prepend({name: "Food", quantity: 1});
    //insert(2,{name: "Food", quantity: 1});
  };

  const onSwapAndMove = () => {
    //swap(0, 2);
    move(0, 2);
  };
  
  const onUpdateAndReplace = () => {
    //update(0, {{name: "Food", quantity: 1}});
    replace([{name: "Food 5", quantity: 5}, {name: "Food 10", quantity: 10}]);
  };

  const onRowDelete = (index: number) => {
    remove(index)
  }


  return (
    <>
      <table className="table table-borderless-table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Quantity</th>
            <th>
              <button className="btn btn-sm btn-secondary" onClick={onRowAdd}>
                + Add
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>
                <TextField
                  {...register(`foodItems.${index}.name` as const, {
                    required: "This field is required.",
                  })}
                  error={errors.foodItems && errors.foodItems[index]?.name}
                />
              </td>
              <td>
                <TextField
                  type="number"
                  min={0}
                  {...register(`foodItems.${index}.quantity` as const)}
                />
              </td>
              <td>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onRowDelete(index)}>
                Del
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {fields.length >= 4 && (
        <button className="btn btn-sm btn-secondary" onClick={onSwapAndMove}>
          Swap adn Move
        </button>
      )}
      <button className="btn btn-sm btn-secondary" onClick={onUpdateAndReplace}>
          Update and Replace
        </button>
    </>
  );
}
