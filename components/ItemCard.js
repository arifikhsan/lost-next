import { isNil } from "lodash";
import Link from "next/link";
import literalCondition from "utils/helper/condition-helper";
import moment from "moment";

export default function ItemCard({ item }) {
  return (
    <Link href={`/item/${item.slug}`}>
      <a className="block p-4 transition duration-500 border rounded hover:shadow-lg">
        <div className="text-xs">
          {item.categories.map((category) => {
            const isFirst = item.categories[0].id == category.id;

            return (
              <span key={category.id}>
                {!isFirst && <span>, </span>}
                {category.name}
              </span>
            );
          })}
        </div>
        <div className="mt-2">
          <p className="text-lg font-bold font-display">{item.title}</p>
          <div className="mt-1">
            {!isNil(item.reward) && (
              <p className="text-sm">
                Hadiah bagi penemu:{" "}
                <span className="font-bold">Rp.{item.reward.value}</span>
              </p>
            )}
          </div>
        </div>
        <div className="mt-3 text-xs">
          <p>
            {literalCondition(item.condition)}{" "}
            {moment(item.time_start).fromNow()}
          </p>
          <p className="mt-1">Oleh: {item.user.name}</p>
        </div>
      </a>
    </Link>
  );
}
