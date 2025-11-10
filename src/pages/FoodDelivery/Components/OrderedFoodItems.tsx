import { useFieldArray, useFormContext, useFormState } from "react-hook-form";
import type {
  FoodType,
  OrderedFoodItemType,
  SelectOptions,
} from "../../../types";
import TextField from "../../../controls/TextField";
import { useEffect, useState } from "react";
import { getFoodItems } from "../../../db";
import Select from "../../../controls/Select";

export default function OrderedFoodItems() {
  const [footList, setFoodList] = useState<FoodType[]>();
  const [foodOptions, setFoodOptions] = useState<SelectOptions[]>([]);
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
    append({ foodId: 0, price: 0, quantity: 0, totalPrice: 0 });
    //prepend({name: "Food", quantity: 1});
    //insert(2,{name: "Food", quantity: 1});
  };

  const onSwapAndMove = () => {
    //swap(0, 2);
    //move(0, 2);
  };

  const onUpdateAndReplace = () => {
    //update(0, {{name: "Food", quantity: 1}});
    //replace([{name: "Food 5", quantity: 5}, {name: "Food 10", quantity: 10}]);
  };

  const onRowDelete = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    const tempList: FoodType[] = getFoodItems();
    const tempOptions: SelectOptions[] = tempList.map((x) => ({
      value: x.foodId,
      text: x.name,
    }));
    setFoodList(tempList);
    setFoodOptions([{value: 0, text: "Select"}, ...tempOptions]);
  }, []);

  return (
    <>
      <table className="table table-borderless-table-hover">
        <thead>
          <tr>
            <th>Food</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>TotalPrice</th>
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
                <Select
                  options={foodOptions}
                  {...register(`foodItems.${index}.foodId` as const)}
                />
              </td>
              <td>Price</td>
              <td>
                <TextField
                  type="number"
                  min={0}
                  {...register(`foodItems.${index}.quantity` as const)}
                />
              </td>
              <td>Total price</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onRowDelete(index)}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {errors.foodItems?.root && (
          <tfoot>
            <tr>
              <td colSpan={5}>
                <span className="error-feedback">
                  {errors.foodItems?.root?.message}
                </span>
              </td>
            </tr>
          </tfoot>
        )}
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
