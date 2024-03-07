export default function Sidebar({ children }) {
   return (
      <div className="grid grid-cols-12">
         <div>Sidebar</div>
         <div className="col-span-11">{children}</div>
      </div>
   );
}
