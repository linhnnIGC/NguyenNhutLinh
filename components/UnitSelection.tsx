import React from 'react';
import { UNITS } from '../constants';
import { UnitDefinition } from '../types';
import { ArrowRight, Book, Globe, Leaf, Users, Building, Activity } from 'lucide-react';

interface UnitSelectionProps {
  onSelectUnit: (unit: UnitDefinition) => void;
}

// Helper to get diverse icons based on unit ID (just for visuals)
const getUnitIcon = (id: number) => {
  switch (id) {
    case 1: return <Activity className="w-6 h-6" />;
    case 2: return <Users className="w-6 h-6" />;
    case 3: return <Building className="w-6 h-6" />;
    case 5: 
    case 10: return <Leaf className="w-6 h-6" />;
    case 4: return <Globe className="w-6 h-6" />;
    default: return <Book className="w-6 h-6" />;
  }
};

export const UnitSelection: React.FC<UnitSelectionProps> = ({ onSelectUnit }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-teal-900 mb-3">Choose Your Unit</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Select a unit from the Global Success 11 textbook to start practicing vocabulary, grammar, and reading skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {UNITS.map((unit) => (
          <button
            key={unit.id}
            onClick={() => onSelectUnit(unit)}
            className="group relative flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-teal-100 hover:shadow-md hover:border-teal-300 transition-all duration-200 text-left"
          >
            <div className="shrink-0 p-3 rounded-full bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200">
              {getUnitIcon(unit.id)}
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-teal-700 transition-colors">
                {unit.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                {unit.topic}
              </p>
              <div className="mt-3 flex items-center text-xs font-semibold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                Start Learning <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};