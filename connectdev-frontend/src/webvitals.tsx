import {onLCP, onFID, onCLS} from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);