import React, { useState, useEffect } from 'react';

const Dealers = () => {
    const [dealers, setDealers] = useState([]);
    const [allDealers, setAllDealers] = useState([]); // keeps full list for state dropdown
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [user, setUser] = useState(null);

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (username) setUser({ userName: username });
    fetchDealers();
  }, []);

  const fetchDealers = async (state = '') => {
    let url = `${window.location.origin}/djangoapp/get_dealers/`;
    if (state) url += `state/${state}/`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const dealerList = data.dealers || [];
      setDealers(dealerList);

      // Extract unique states for dropdown
      if (!state) {
        setAllDealers(dealerList);
        const uniqueStates = [...new Set(dealerList.map(d => d.state))].sort();
        setStates(uniqueStates);
      }
    } catch (err) {
      console.error('Failed to fetch dealers:', err);
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);

    if (!state) {
      // Reset to full list without re-fetching
      setDealers(allDealers);
    } else {
      fetchDealers(state);
    }
  };

  return (
    <div>
      <table className="table" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dealer Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Zip</th>
            <th>
              <select value={selectedState} onChange={handleStateChange}>
                <option value="">State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </th>
            {user && <th>Review Dealer</th>}
          </tr>
        </thead>
        <tbody>
          {dealers.length === 0 ? (
            <tr>
              <td colSpan={user ? 7 : 6} style={{ textAlign: 'center' }}>
                No dealers found.
              </td>
            </tr>
          ) : (
            dealers.map(dealer => (
              <tr key={dealer.id}>
                <td>{dealer.id}</td>
                <td>
                  <a href={`/dealer/${dealer.id}`}>{dealer.full_name}</a>
                </td>
                <td>{dealer.city}</td>
                <td>{dealer.address}</td>
                <td>{dealer.zip}</td>
                <td>{dealer.state}</td>
                {user && (
                  <td>
                    <a href={`/postreview/${dealer.id}`}>
                      <img
                        src="/static/assets/reviewicon.png"
                        alt="Post Review"
                        style={{ width: '30px', cursor: 'pointer' }}
                      />
                    </a>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;