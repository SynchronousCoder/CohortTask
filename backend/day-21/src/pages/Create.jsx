import { useContext } from "react";
import { useForm } from "react-hook-form";
import { recipecontext } from "../context/RecipeContext";
import { nanoid } from "nanoid";

const Create = () => {
    const {data, setdata} = useContext(recipecontext)
    const { register, handleSubmit, reset } = useForm();

    const submitHandler = (recipe) => {
        recipe.id = nanoid()
        console.log(recipe)

        setdata([...data, recipe])
        reset()
    }

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>

        <input
          {...register("dishName")}
          type="text"
          placeholder="Enter dish name"
        />
        <textarea
          {...register("ingredients")}
          type="text"
          placeholder="Enter ingredients"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Create;
