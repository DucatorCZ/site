import type { AuctionResult } from '../../data'
import { formatCzk, formatDate } from '../../lib/format'

function AuctionTable({ auctions }: { auctions: AuctionResult[] }) {
  if (auctions.length === 0) {
    return <p className="muted">Pro tuto minci zatím neevidujeme žádné aukční výsledky.</p>
  }

  return (
    <div className="tableWrap">
      <table className="data">
        <thead>
          <tr>
            <th>Datum</th>
            <th>Známka</th>
            <th>Certifikace</th>
            <th>Aukční dům</th>
            <th className="num">Dosažená cena</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map((a, i) => (
            <tr key={i}>
              <td>{formatDate(a.date)}</td>
              <td>
                <span className="badge badgeAccent">{a.gradeLabel}</span>
              </td>
              <td>{a.service}</td>
              <td>{a.auctionHouse}</td>
              <td className="num">
                <strong>{formatCzk(a.priceCzk)}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AuctionTable
