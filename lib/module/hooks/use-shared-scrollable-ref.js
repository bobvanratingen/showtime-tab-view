import { useEffect } from "react";
import { useAnimatedRef } from "react-native-reanimated";
export function useSharedScrollableRef(forwardRef) {
  const ref = useAnimatedRef();
  useEffect(() => {
    if (!forwardRef) {
      return;
    }
    if (typeof forwardRef === "function") {
      forwardRef(ref.current);
    } else {
      forwardRef.current = ref.current;
    }
  });
  return ref;
}
//# sourceMappingURL=use-shared-scrollable-ref.js.map