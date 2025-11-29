import fs from "fs";
import path from "path";

// Mapping of corrupted imports to their correct package names
const importMappings = {
  'AccordionPrimitive': '@radix-ui/react-accordion',
  'AlertDialogPrimitive': '@radix-ui/react-alert-dialog',
  'AspectRatioPrimitive': '@radix-ui/react-aspect-ratio',
  'AvatarPrimitive': '@radix-ui/react-avatar',
  'CheckboxPrimitive': '@radix-ui/react-checkbox',
  'CollapsiblePrimitive': '@radix-ui/react-collapsible',
  'ContextMenuPrimitive': '@radix-ui/react-context-menu',
  'HoverCardPrimitive': '@radix-ui/react-hover-card',
  'LabelPrimitive': '@radix-ui/react-label',
  'MenubarPrimitive': '@radix-ui/react-menubar',
  'NavigationMenuPrimitive': '@radix-ui/react-navigation-menu',
  'PopoverPrimitive': '@radix-ui/react-popover',
  'RadioGroupPrimitive': '@radix-ui/react-radio-group',
  'ScrollAreaPrimitive': '@radix-ui/react-scroll-area',
  'SeparatorPrimitive': '@radix-ui/react-separator',
  'SheetPrimitive': '@radix-ui/react-dialog',
  'SliderPrimitive': '@radix-ui/react-slider',
  'TabsPrimitive': '@radix-ui/react-tabs',
  'TogglePrimitive': '@radix-ui/react-toggle',
  'ToggleGroupPrimitive': '@radix-ui/react-toggle-group',
  'TooltipPrimitive': '@radix-ui/react-tooltip',
  'Slot': '@radix-ui/react-slot'
};

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const f = path.join(dir, file);
    if (fs.statSync(f).isDirectory()) {
      walk(f);
    } else if (f.endsWith(".ts") || f.endsWith(".tsx")) {
      fixFile(f);
    }
  }
}

function fixFile(file) {
  let code = fs.readFileSync(file, "utf8");
  let changed = false;

  // Fix corrupted imports with [0] pattern - handle both "import * as" and "import { }"
  for (const [primitive, packageName] of Object.entries(importMappings)) {
    // Pattern 1: import * as Primitive from " \n    [0]\n  ";
    const pattern1 = new RegExp(
      `import \\* as ${primitive} from "\\s*\\[0\\]\\s*";`,
      'gs'
    );
    // Pattern 2: import { Primitive } from " \n    [0]\n  ";
    const pattern2 = new RegExp(
      `import \\{\\s*${primitive}\\s*\\} from "\\s*\\[0\\]\\s*";`,
      'gs'
    );
    
    if (pattern1.test(code)) {
      code = code.replace(pattern1, `import * as ${primitive} from "${packageName}";`);
      changed = true;
    }
    if (pattern2.test(code)) {
      code = code.replace(pattern2, `import { ${primitive} } from "${packageName}";`);
      changed = true;
    }
  }

  // Fix versioned imports (remove @version)
  const versionedImports = [
    ['lucide-react@0.487.0', 'lucide-react'],
    ['class-variance-authority@0.7.1', 'class-variance-authority'],
    ['next-themes@0.4.6', 'next-themes'],
    ['sonner@2.0.3', 'sonner'],
    ['input-otp@1.4.2', 'input-otp'],
    ['vaul@1.1.2', 'vaul'],
    ['cmdk@1.1.1', 'cmdk'],
    ['recharts@2.15.2', 'recharts'],
    ['embla-carousel-react@8.6.0', 'embla-carousel-react'],
    ['react-day-picker@8.10.1', 'react-day-picker'],
    ['react-resizable-panels@2.1.7', 'react-resizable-panels']
  ];

  for (const [versioned, clean] of versionedImports) {
    if (code.includes(versioned)) {
      code = code.replace(new RegExp(versioned, 'g'), clean);
      changed = true;
    }
  }

  // Remove PowerShell corruption
  if (code.includes('$m.Value') || code.includes('param($m)')) {
    code = code.replace(/\(\$m\.Value[\s\S]*?"\)/g, "");
    code = code.replace(/param\(\$m\)/g, "");
    changed = true;
  }

  // Fix empty imports
  if (code.includes('from "  "') || code.includes("from '  '")) {
    code = code.replace(/from "\s+"/g, 'from ""');
    code = code.replace(/from '\s+'/g, "from ''");
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, code, "utf8");
    console.log("✅ Fixed:", file);
  }
}

console.log("🔧 Starting import cleanup...\n");
walk("./src");
console.log("\n✨ Import cleanup complete!");
