export const Card = ({
  name,
  img,
  abilities,
  types,
  moves,
  held_items,
  forms,
}) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg w-64">
      {/* Image */}
      <div className="flex justify-center">
        <img src={img} alt={name} className="w-36 h-32 object-contain" />
      </div>

      {/* Name */}
      <h1 className="text-center text-2xl font-bold mt-3 capitalize">{name}</h1>

      {/* Divider */}
      <div className="border-t-2 border-gray-700 my-3" />

      {/* Abilities */}
      <div>
        <p className="font-semibold">Abilities:</p>
        <ul className="text-sm list-disc list-inside">
          {abilities?.map((ability) => (
            <li className="ml-6" key={ability.ability.name}>
              {ability.ability.name.charAt(0).toUpperCase() +
                ability.ability.name.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Types */}
      <div>
        <p className="font-semibold">Types:</p>
        <div className="flex gap-2 mt-1">
          {types?.map((type) => (
            <span
              key={type.type.name}
              className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs"
            >
              {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Moves */}
      <div>
        <p className="font-semibold mt-2">Moves:</p>
        <ul className="text-sm list-disc list-inside h-24 overflow-y-auto">
          {moves?.map((move) => (
            <li className="ml-6" key={move.move.name}>
              {move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Held Items */}
      {held_items?.length > 0 && (
        <div>
          <p className="font-semibold mt-2">Held items:</p>
          <ul className="text-sm list-disc list-inside">
            {held_items?.map((item) => (
              <li className="ml-6" key={item.item.name}>
                {item.item.name.charAt(0).toUpperCase() +
                  item.item.name.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Forms */}
      <div>
        <p className="font-semibold mt-2">Forms:</p>
        <ul className="text-sm list-disc list-inside">
          {forms?.map((item) => (
            <li className="ml-6" key={item.name}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
