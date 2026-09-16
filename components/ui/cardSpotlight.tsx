import { IconType } from "react-icons";
import { CardSpotlight } from "../aceternity/card-spotlight";
import { LucideIcon } from "lucide-react";
type ToolIcon = LucideIcon | IconType;

interface ToolCardProps {
    name: string;
    description: string;
    icon: ToolIcon;
    connected?: boolean;
    loading?: boolean;
    onConnect?: () => void;
    onManage?: () => void;
}
export function CardSpotlightDemo({
    name,
    description,
    icon: Icon,
    connected = false,
    loading = false,
    onConnect,
    onManage,
}: ToolCardProps) {

    return (
        <CardSpotlight className="h-full w-full rounded-2xl">
            <div
                className="
       h-full
       w-full
    relative
    inset-0
       
   

      "
            >
                {/* ICON + STATUS */}
                <div className="flex items-center justify-between">
                    <div
                        className={`
            flex
        
            items-center
            justify-center
       
            ${connected
                                ? "bg-green-500/20"
                                : "bg-cyan-500/10"
                            }
          `}
                    >
                        <Icon
                            size={30}
                            className={
                                connected
                                    ? "text-green-400"
                                    : "text-cyan-300"
                            }
                        />
                    </div>

                    <span
                        className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-medium
            ${loading
                                ? "bg-yellow-500/20 text-yellow-300"
                                : connected
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-red-500/20 text-red-300"
                            }
          `}
                    >
                        {loading
                            ? "Checking..."
                            : connected
                                ? "Connected"
                                : "Disconnected"}
                    </span>
                </div>

                {/* NAME */}
                <h2 className="mt-5 text-xl font-semibold text-white">
                    {name}
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-2 text-sm text-white/60">
                    {description}
                </p>

                {/* BUTTON */}
                <button

                    disabled={loading}
                    onClick={
                        connected
                            ? onManage
                            : onConnect
                    }
                    className={`
      neu-button
      z-50
      active:neu-button-active
          mt-6
          w-full
          rounded-xl
          border
          py-3
          font-medium
          transition

          ${connected
                            ? "border-green-500/20 bg-green-500/10 text-green-300"
                            : "border-white/10 text-white hover:bg-white/10"
                        }

          ${loading
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }
        `}
                >
                    {loading
                        ? "Checking..."
                        : connected
                            ? "Manage"
                            : "Connect"}
                </button>
            </div>
        </CardSpotlight>
    );
}

const Step = ({ title }: { title: string }) => {
    return (
        <li className="flex gap-2 items-start">
            <CheckIcon />
            <p className="text-white">{title}</p>
        </li>
    );
};

const CheckIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-blue-500 mt-1 shrink-0"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
                d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
                fill="currentColor"
                strokeWidth="0"
            />
        </svg>
    );
};
