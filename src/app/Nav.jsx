import { Link } from "react-router-dom";
import { navItems } from "../constants/data";
export default function Nav() {
    return (
        <div className="w-full space-y-2 text-white bg-gray-800 p-2 rounded">
          {navItems.map((item) => (
            <div key={item.title} className="relative group w-full">
              <Link
                to={item.url}
                className="block px-2 py-1 hover:bg-gray-600 rounded"
              >
                {item.title}
              </Link>
              {item.items?.length > 0 && (
                <div className="absolute left-full top-0 bg-gray-800 border shadow-lg hidden group-hover:block z-20">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.url}
                      className="block px-4 py-2 hover:bg-gray-600 whitespace-nowrap"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
    )
}